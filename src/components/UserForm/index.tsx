import React, { useCallback, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { IMaskInput } from "react-imask";
import Divider from "antd/lib/divider";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
// import { addDoc, collection, where, query, getDocs } from "firebase/firestore";
// import { firestore as db } from "../../firebase";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { App } from "antd";
import UserType from "../../interfaces/user"; // Updated interface
import Modal from "react-bootstrap/Modal";
import WarningIcon from "../../assets/icons/WarningIcon";
import { showNotification } from "../../helpers/showNotification";
import { Timestamp } from "firebase/firestore";
import userAvatar from "../../assets/images/carbon--user-avatar-filled.png";
import Image from "react-bootstrap/Image";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";
import { cpf, cnpj } from "cpf-cnpj-validator";

type roleType = {
  displayName: {
    pt: string;
    en: string;
  };
};

type rolesMap = { [key: string]: roleType };

const personsData: rolesMap = {
  individual: { displayName: { pt: "Pessoa Física", en: "Individual" } },
  company: { displayName: { pt: "Pessoa Jurídica", en: "Company" } },
  student: { displayName: { pt: "Estudante", en: "Student" } },
};

const rolesDataTest: rolesMap = {
  admin: { displayName: { pt: "Administrador", en: "Administrator" } },
  manager: { displayName: { pt: "Gestor", en: "Manager" } },
  student: { displayName: { pt: "Estudante", en: "Student" } },
  user: { displayName: { pt: "Usuário", en: "User" } },
};

const UserForm = () => {
  const loadedTargetUser = useLoaderData() as UserType;
  const location = useLocation();
  const [rolesData, setRolesData] = useState<rolesMap>({});
  const [isInputChanged, setIsInputChanged] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{
    [key: string]: string | null;
  }>({});
  const {
    user: callerUser,
    // isLoading: loadingCallerUser,
    refreshUserData,
    role: callerRole,
  } = useAuth();
  const [targetUser, setTargetUser] = useState<UserType>({
    uid: "",
    displayName: "",
    fullName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    photoURL: null,
    createdAt: Timestamp.now(),
    role: "",
    personType: "unset",
    cpf: "",
    cnpj: "",
    studentId: "",
  });

  useEffect(() => {
    /*
    const roles: rolesMap = {};
    getDocs(collection(db, "roles"))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          roles[doc.id] = doc.data() as roleType;
        });
      })
      .catch((error) => {
        console.error("Error fetching roles: ", error);
      })
      .finally(() => {
        setRolesData(roles);
      });
    */
    setRolesData(rolesDataTest);
  }, []);

  useEffect(() => {
    if (loadedTargetUser) {
      setTargetUser(loadedTargetUser);
    }
  }, [loadedTargetUser]);

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);
  const updateUserProfile = httpsCallable(functions, "updateUser");
  const createUserProfile = httpsCallable(functions, "createUser");

  // A central function to validate cpf and cnpj fields
  const validateField = useCallback((field: keyof UserType, value: string) => {
    let error: string | null = null;
    if (field === "cpf") {
      // Only validate if there is a value, and it's not valid.
      if (value && !cpf.isValid(value)) {
        error = "CPF inválido.";
      }
    } else if (field === "cnpj") {
      if (value && !cnpj.isValid(value)) {
        error = "CNPJ inválido.";
      }
    }
    console.log(error);
    // Update the errors state for the specific field
    setFormErrors((currErrors) => ({
      ...currErrors,
      [field]: error,
    }));
  }, []);

  const handleInputChange = useCallback(
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
      field: keyof UserType,
    ) => {
      setIsInputChanged(true);
      const value = event.target.value;
      setTargetUser((currentState) => ({
        ...currentState,
        [field]: value,
      }));

      validateField(field, value);
    },
    [validateField],
  );

  const handleSubmitEditing = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // Prevent submission if there are validation errors.
      const hasErrors = Object.entries(formErrors).some(([field, error]) => {
        console.error(field, error);
        return error !== null;
      });
      if (hasErrors) {
        showNotification(
          notification,
          "Por favor, corrija os campos inválidos.",
          "error",
        );
        return;
      }

      setIsLoading(true);
      if (targetUser.uid) {
        // ===========================================================
        // Update targetUser
        // ===========================================================
        if (isInputChanged) {
          // Update User data in Firestore and Authentication at Backend:
          const updateData = {
            uid: targetUser.uid,
            email: targetUser.email,
            phone: targetUser.phone || null,
            firstName: targetUser.firstName,
            allLastNames: targetUser.allLastNames,
            role: targetUser.role || null,
            personType: targetUser.personType || null,
            cpf: targetUser.cpf || null,
            cnpj: targetUser.cnpj || null,
            studentId: targetUser.studentId || null,
          };
          try {
            await updateUserProfile(updateData);
            showNotification(
              notification,
              "Os dados do usuário foram atualizados com sucesso!",
              "success",
            );

            // If the updated user is the currently logged-in user, refresh their token.
            if (callerUser?.uid === targetUser.uid) {
              await new Promise((resolve) => setTimeout(resolve, 500));
              await refreshUserData();
            }
            navigate(-1);
          } catch (error) {
            console.error(error);
            showNotification(
              notification,
              "As mudanças não foram salvas!\n Verifique e tente novamente.",
              "error",
            );
          } finally {
            setIsLoading(false);
          }
        } else {
          showNotification(notification, "Não houve alterações", "warning");
          navigate(-1);
        }
      }
      // ===========================================================
      // Add new targetUser (Registration)
      // ===========================================================
      else {
        if (
          targetUser.email &&
          targetUser.role &&
          targetUser.firstName &&
          targetUser.lastName
        ) {
          // Create User Profile in Firestore and Authentication at Backend:
          try {
            await createUserProfile({
              email: targetUser.email,
              role: targetUser.role,
              password: "123456",
              phone: targetUser.phone || null,
              firstName: targetUser.firstName,
              lastName: targetUser.lastName,
            });
            showNotification(
              notification,
              `O Perfil do usuário ${targetUser.email}, foi criado com sucesso!`,
              "success",
            );
            navigate(-1);
          } catch (error) {
            showNotification(
              notification,
              "O perfil do usuário não foi adicionado!\n Verifique e tente novamente.",
              "error",
            );
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        } else {
          showNotification(
            notification,
            "Atenção: Os campos email, nome, sobrenome e tipo devem ser preenchidos!",
            "warning",
          );
        }
      }
    },
    [
      targetUser,
      isInputChanged,
      navigate,
      notification,
      updateUserProfile,
      createUserProfile,
      callerUser,
      refreshUserData,
    ],
  );

  return (
    <>
      <Form
        onSubmit={handleSubmitEditing}
        className="mt-3 mb-5 p-3 bg-light rounded-2 d-flex justify-content-center flex-column shadow"
      >
        <h4 className="text-center mb-4">
          {location.pathname.match("/app/users/edit")
            ? "Editar usuário"
            : "Adicionar novo usuário"}
        </h4>
        {/* Profile picture */}
        <Row className="mb-3 d-flex justify-content-center">
          <Col
            md="auto"
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <Image
              src={targetUser.photoURL || userAvatar}
              alt="User"
              style={{ width: "auto", height: "120px" }}
              roundedCircle
              className="my-2"
            />
            <Form.Label className="text-muted">
              {targetUser.photoURL ? "Foto de perfil" : "Sem foto de perfil"}
            </Form.Label>
          </Col>
        </Row>
        <Form.Text className="mb-3">Dados Básicos:</Form.Text>
        <Row className="mb-3">
          {/* First Name */}
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nome"
              name="firstName"
              onChange={(event) => handleInputChange(event, "firstName")}
              value={targetUser.firstName || ""}
            />
          </Form.Group>
          {/* Last Name */}
          <Form.Group as={Col} md="8" controlId="validationCustom01">
            <Form.Label>Sobrenome</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Sobrenome"
              name="lastName"
              onChange={(event) => handleInputChange(event, "allLastNames")}
              value={targetUser.allLastNames || ""}
            />
          </Form.Group>
        </Row>
        <Form.Text className="mb-3">Contato:</Form.Text>
        <Row className="mb-3">
          {/* Email */}
          <Form.Group as={Col} md="7" controlId="validationCustom03">
            <Form.Label>Email</Form.Label>
            <Form.Control
              // style={{ width: "15rem" }}
              type="email"
              placeholder="Email"
              onChange={(event) => handleInputChange(event, "email")}
              required
              value={targetUser.email || ""}
            />
          </Form.Group>
          {/* Phone Number */}
          <Form.Group as={Col} md="5" controlId="validationCustomUsername">
            <Form.Label>Celular</Form.Label>
            <IMaskInput
              id="formBasicPhone"
              className="form-control"
              mask="(00) 0 0000-0000"
              placeholder="(__) _ ____-____"
              name="phone"
              onAccept={(value) => {
                // Create a synthetic event to pass to your existing handler
                const syntheticEvent = {
                  target: { value: value as string },
                } as React.ChangeEvent<HTMLInputElement>;
                handleInputChange(syntheticEvent, "phone");
              }}
              value={targetUser.phone || ""}
            />
          </Form.Group>
        </Row>
        <Form.Text className="mb-3">Conta:</Form.Text>
        <Row className="mb-3">
          {/* Person Type */}
          <Form.Group as={Col} md="6" controlId="">
            <Form.Label>Pessoa</Form.Label>
            <Form.Select
              disabled={callerRole !== "admin"}
              required
              name="personType"
              value={targetUser.personType || "unset"}
              onChange={(event) => handleInputChange(event, "personType")}
            >
              <option value="unset">Não especificado</option>
              {Object.entries(personsData).map(([keyValue, displayName]) => (
                <option key={keyValue} value={keyValue}>
                  {displayName.displayName.pt}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {/* CPF, CNPJ or RA */}
          {targetUser.personType === "individual" ? (
            // Pessoa Física
            <Form.Group as={Col} md="6" controlId="formCPF">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                as={IMaskInput}
                isInvalid={Boolean(formErrors.cpf)}
                className="form-control"
                mask="000.000.000-00"
                placeholder="___.___.___-__"
                name="cpf"
                onAccept={(value: string) => {
                  const syntheticEvent = {
                    target: { value },
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleInputChange(syntheticEvent, "cpf");
                }}
                value={targetUser.cpf || ""}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.cpf}
              </Form.Control.Feedback>
            </Form.Group>
          ) : targetUser.personType === "company" ? (
            // Pessoa Jurídica
            <Form.Group as={Col} md="6" controlId="formCNPJ">
              <Form.Label>CNPJ</Form.Label>
              <Form.Control
                as={IMaskInput}
                isInvalid={Boolean(formErrors.cnpj)}
                className="form-control"
                mask="00.000.000/0000-00"
                placeholder="__.___.___/____-__"
                name="cnpj"
                onAccept={(value: string) => {
                  const syntheticEvent = {
                    target: { value },
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleInputChange(syntheticEvent, "cnpj");
                }}
                value={targetUser.cnpj || ""}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.cpf}
              </Form.Control.Feedback>
            </Form.Group>
          ) : targetUser.personType === "student" ? (
            // Estudante
            <Form.Group as={Col} md="6" controlId="formStudentID">
              <Form.Label>RA</Form.Label>
              <IMaskInput
                id="formStudentID"
                className="form-control"
                mask="000000"
                placeholder={"_".repeat(6)}
                name="studentID"
                onAccept={(value) => {
                  // Create a synthetic event to pass to your existing handler
                  const syntheticEvent = {
                    target: { value: value as string },
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleInputChange(syntheticEvent, "studentId");
                }}
                value={targetUser.studentId || ""}
              />
            </Form.Group>
          ) : null}
        </Row>
        <Row className="mb-3">
          {/* Role */}
          <Form.Group as={Col} md="6" controlId="">
            <Form.Label>Tipo</Form.Label>
            <Form.Select
              disabled={callerRole !== "admin"}
              required
              name="role"
              value={targetUser.role}
              onChange={(event) => handleInputChange(event, "role")}
            >
              <option value="" disabled>
                Selecione
              </option>
              {Object.entries(rolesData).map(([id, role]) => (
                <option key={id} value={id}>
                  {role.displayName.pt}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>

        {/* <Form.Text className="fst-italic text-danger">
          * Campos obrigatórios
        </Form.Text> */}

        <Divider />
        <Row>
          {/* ========================== Salvar ========================== */}
          <Form.Group
            as={Col}
            md="4"
            className="d-flex gap-2 justify-content-end p-2 w-100"
          >
            <Button
              type="button"
              variant="outline-dark"
              onClick={() => (isInputChanged ? showModal() : navigate(-1))}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="dark" disabled={isLoading}>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                className={`me-2 ${isLoading ? "" : "d-none"}`}
              />
              {location.pathname.match("/app/users/edit")
                ? "Salvar"
                : "Adicionar"}
            </Button>
          </Form.Group>
        </Row>
      </Form>

      {/* Modal ============================================== */}

      <Modal show={show} onHide={closeModal} animation={true} centered>
        <Modal.Header>
          <span className="d-flex justify-content-center align-items-end gap-3">
            <WarningIcon />
            <h3 className="m-0">Atenção</h3>
          </span>
        </Modal.Header>
        <Modal.Body>Os dados serão perdidos. Deseja sair?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => navigate(-1)}>
            Sim
          </Button>
          <Button variant="dark" onClick={closeModal}>
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserForm;
