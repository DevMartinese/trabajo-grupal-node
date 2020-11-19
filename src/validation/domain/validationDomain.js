const sendToSqs = require("../service/validationService");
const validator = require('validator').default;
const { InputValidation } = require("ebased/schema/inputValidation");

module.exports = async (commandPayload, commandMeta) => {
  const {
    email,
    birthDate,
    signature,
    photo,
  } = commandPayload;

  new inputPersonDNISchema (
    commandPayload,
    commandMeta
  )

  if ( !validator.isEmail(email)) return { status:400 ,body:"El formato de mail es incorrecto "};
  if ( !validator.isDate(birthDate,"DD/MM/YYYY")) return { status:400 ,body:"El formato de fecha de nacimiento es incorrecto "};
  if ( !validator.isURL(signature)) return { status:400 ,body:"El formato de la firma es incorrecto "};
  if ( !validator.isURL(photo)) return { status:400 ,body:"El formato de la foto es incorrecto "};

  await sendToSqs(commandPayload);
  return { body: "Tus datos son correctos para iniciar el tramite !"};

};

class inputPersonDNISchema extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.status,
      payload: payload,
      source: "VALIDATION.DOMAIN",
      specversion: "v1.0.0",
      schema: {
        strict: true,
        names: { type: String, min: 2, max: 50, regex: /^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$/, required: true },
        lastName: { type: String, min: 2, max: 50, regex: /^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$/, required: true },
        email: { type: String, min: 2, max: 200, required: true },
        address: { type: String, min: 2, max: 50, required: true },
        locality: { type: String, min: 2, max: 50, regex: /^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$/, required: true },
        province: { type: String, min: 2, max: 20, regex: /^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$/, required: true },
        sex: { type: String, min: 1, max: 1, enum: ["M", "F"], required: true },
        nationality: { type: String, min: 1, max: 20, regex: /^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$/, required: true },
        birthDate: { type: String, min: 10, max: 10, required: true },
        donor: { type: Boolean, default: true , required: true },
        signature: { type: String, min: 2, max: 500, required: true },
        photo: { type: String, min: 2, max: 500, required: true },
      },
    });
  }
}
