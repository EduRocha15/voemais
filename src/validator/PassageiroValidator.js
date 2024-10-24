import * as Yup from 'yup';

const PassageiroValidator = Yup
    .object()
    .shape({
        nome: Yup
            .string()
            .max(50,'')
            .required('Campo obrigatório'),

        tipo_documento: Yup
            .string()
            .required('Inisira o tipo do documento. (RG, CNH, ... etc.)'),

        documento: Yup
            .string()
            .required('Insira o número do documento.'),

        email: Yup.string()
            .email('Insira um emal válido.')
            .required('Insira um email.'),

        telefone: Yup
            .string()
            .required(false),

        data_nascimento: Yup.date()
            .required('Insira a data de nascimento.')
    });

export default PassageiroValidator