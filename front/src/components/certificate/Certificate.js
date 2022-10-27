import React, { useState } from "react";
import CertificateCard from "./CertificateCard";
import CertificateEditForm from "./CertificateEditForm";

function Certificate ({ certificate , setCertificates, isEditable }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          currentCertificate ={certificate}
          setCertificates={setCertificates}
          setIsEditing={setIsEditing}
        />
      ) : (
        <CertificateCard
          certificate ={certificate}
          setCertificates = {setCertificates}// 삭제 기능 구현
          setIsEditing={setIsEditing}
          isEditable={isEditable}
  
        />
      )}
    </>
  );
}

export default Certificate ;
