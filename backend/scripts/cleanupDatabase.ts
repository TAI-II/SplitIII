import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SessionsService } from '../src/modules/sessions/sessions.service';
import { UserService } from '../src/modules/users/user.service';
import { CleanupUtility } from '../test/utility/cleanup.utility';

// Add your IDs here
const sessionIdsToDelete = [
  // 'session-id-1',
  // 'session-id-2',
  '6726a20779f2c61d7a0db293',
  "6726a2a9a524a683cbdcf46d",
  '6726a2fb6bcdd18837b7a8a8',
  '6726a30c0ed2c11b2dec7bda',
  '6726a4f7d7d27309331871b4',
  '6726a4f7d7d27309331871ba'
];

const userIdsToDelete = [
  // '507f1f77bcf86cd799439011',
  // '507f1f77bcf86cd799439012',
  '67159088d463453e784292bd',
  '67217fe644e493bd86490778',
  '672185fb11d6729dfe2c1014',
  '6726412884ae227dcc47a925',
  '6726423d2df75105abfc32bf',
  '6726a20779f2c61d7a0db291',
  '6726a2a9a524a683cbdcf46b',
  '6726a2fb6bcdd18837b7a8a6',
  '6726a30c0ed2c11b2dec7bd8',
  '6726a3c63f3216a704cbe339',
  '6726a3f6729e36056789c978',
  '6726a4e9b2d6ca80188879a6',
  '6726a4f7d7d27309331871b2',
  '6726a4f7d7d27309331871b6',
  '6726a4f7d7d27309331871b8',
];

async function cleanupDatabase() {
  // Create a NestJS application context
  const app = await NestFactory.createApplicationContext(AppModule);

  // Get the services from the application context
  const sessionsService = app.get(SessionsService);
  const userService = app.get(UserService);

  // Track all IDs for deletion
  sessionIdsToDelete.forEach(id => CleanupUtility.trackSessionId(id));
  userIdsToDelete.forEach(id => CleanupUtility.trackUserId(id));

  try {
    // Run the cleanup
    await CleanupUtility.cleanup(sessionsService, userService);
  } finally {
    // Always close the application context
    await app.close();
  }
  
  process.exit(0);
}

// Run the cleanup
cleanupDatabase().catch(error => {
  console.error('Cleanup failed:', error);
  process.exit(1);
}); 