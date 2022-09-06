import React from "react";

interface LoadingProps {
  text?: string;
}

export default function Loading(props: LoadingProps) {
  return <i className={`fas fa-circle-notch fa-spin ${props.text}`} />;
}
