import React, { useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { COLORS } from "../assets";

interface AlertProps {
  title: string;
  message: string;
  show: boolean;
  onDismiss: () => void;
}

const CustomAlert: React.FC<AlertProps> = ({
  title,
  message,
  show,
  onDismiss,
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
    onConfirmPressed={onDismiss}
    messageStyle={{ textAlign: "center" }} // This will center the text
  />
);

export default CustomAlert;
