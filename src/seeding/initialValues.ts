import { InitialValuesRespository } from 'src/initialValues/initialValues.repository';

export const initiateInitialValues = async (postgresService) => {
  const initialValuesRepository = new InitialValuesRespository(postgresService);
  await initialValuesRepository.addInitialValues({
    volunteers: 0,
    scholarshipRecipients: 0,
  });
};
