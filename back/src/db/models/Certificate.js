import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }
  static async findById({ user_id }) {
    const certificate = await CertificateModel.findOne({ user_id });
    return certificate;
  }

  static async findAll({ user_id }) {
    // const certificates = await CertificateModel.find({ user_id });
    const filter = { user_id: user_id };
    const Certificates = await CertificateModel.find(filter);
    const certificate_list = Certificates.map((data) => {  
      // let StringAcquisitionDate = ""+data.acquisitionDate; 
      return {
          object_id: data._id,
          user_id: data.user_id,
          title: data.title,
          description: data.description,
          acquisitionDate: data.acquisitionDate.substring(0, 10),
      }
  });
    return certificate_list;
  }

  static async update({ object_id, fieldToUpdate, newValue }) {
    const filter = { _id: object_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }
  static async delete({ object_id }) {
    const filter = { _id: object_id };
    const deletedCertificate = await CertificateModel.deleteOne(filter);
    return deletedCertificate;
  }
}

export { Certificate };
