import { PostgresService } from '../postgres/postgres.service';
import { initiateInitialValues } from './initialValues';
import { initiateDonations } from './donations';
import { initiateAdminUser } from './accounts';

export async function seeding() {
  const postgresService = new PostgresService();
  await initiateInitialValues(postgresService);
  await initiateDonations(postgresService);
  await initiateAdminUser(postgresService);
}
