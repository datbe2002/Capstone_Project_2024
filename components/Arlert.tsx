import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { COLORS } from "../assets";

interface AlertProps {
  title: string;
  message: string;
  show: boolean;
  onDismiss: () => void;
  onConfirm?: () => void; // Make this optional
}

const CustomAlert: React.FC<AlertProps> = ({
  title,
  message,
  show,
  onDismiss,
  onConfirm,
}) => (
  <AwesomeAlert
    show={show}
    title={title}
    message={message}
    closeOnTouchOutside={true}
    closeOnHardwareBackPress={true}
    showConfirmButton={true}
    confirmText="OK"
    confirmButtonColor={COLORS.primary}
    onConfirmPressed={onConfirm || onDismiss} // If onConfirm is not provided, call onDismiss
    showCancelButton={onConfirm ? true : false}
    cancelButtonColor={COLORS.secondary}
    onCancelPressed={onDismiss}
    messageStyle={{ textAlign: "center" }}
  />
);

export default CustomAlert;
