import * as Yup from 'yup';

const PassagemValidator = Yup
    .object()
    .shape({
        voo: Yup.string()
        .required('Insira o código do voo.'),

        passageiro: Yup.string('Insira o codigo do passageiro.')
        .required(),

        assento: Yup.string()
        .required('Insira o assento.'),

        preco: Yup.string()
        .required('Insira o valor da passagem.'),
    });

export default PassagemValidator