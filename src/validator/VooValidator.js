import * as Yup from 'yup';

const VooValidator = Yup
    .object()
    .shape({
        internacional: Yup.string()
        .required(false),

        identificador: Yup.string()
        .required('Insira o código de verificador.'),

        data_checkin: Yup.date()
        .required('Campo obrigatório!'),

        data_embarque: Yup.date()
        .required('Campo obrigatório!'),

        origem: Yup.string()
        .required('Campo obrigatório!'),

        destino: Yup.string()
        .required('Campo obrigatório!'),

        empresa: Yup.string()
        .required('Insira a empresa responsável pelo voo.'),

        preco: Yup.string()
        .required('Insira o valor da passagem.'),
    });

export default VooValidator