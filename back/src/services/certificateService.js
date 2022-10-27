import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class certificateService {
  static async addCertificate({ user_id, certificateData }) {
    
    // const user = await Certificate.findAll({ user_id });
   
    // const id = user_id;
   
    const newCertificate = { user_id, ...certificateData};
    const createdNewCertificate = await Certificate.create({ newCertificate });
    
    return createdNewCertificate;
  }

  static async getCertificate_id({ object_id }) {
    const user = await Certificate.findById({ _id: object_id });

    return user;
  }
  static async getCertificate({ user_id }) {
    const user = await Certificate.findById({ user_id });

    return user;
  }
  
  static async getCertificates({ user_id }) {
    const certificates = await Certificate.findAll({ user_id });

    return certificates;
  }

  static async setCertificate({ object_id, toUpdate }) {
    let certificate = null;
    
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      certificate = await Certificate.update({ object_id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      certificate = await Certificate.update({ object_id, fieldToUpdate, newValue });
    }

    if (toUpdate.acquisitionDate) {
      const fieldToUpdate = "acquisitionDate";
      const newValue = toUpdate.acquisitionDate;
      certificate = await Certificate.update({ object_id, fieldToUpdate, newValue });
    }

    return certificate;
  }

  static async delCertificate({ object_id }) {
    const deleteCertificate = await Certificate.delete({ object_id });
    return deleteCertificate;
}
}

export { certificateService };

