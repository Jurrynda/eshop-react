import React from "react";

import Alert from "react-bootstrap/Alert";

const Message = (props) => {
  const { variant, message } = props;
  return (
    <Alert key={variant} variant={variant} className="text-center">
      {message}
    </Alert>
  );
};

export default Message;
