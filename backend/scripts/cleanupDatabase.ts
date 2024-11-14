import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SessionsService } from '../src/modules/sessions/sessions.service';
import { UserService } from '../src/modules/users/user.service';
import { CleanupUtility } from '../test/utility/cleanup.utility';

const usersToDelete = [
  {
    "_id": "672b82b2e23b2c8d40154a61",
    "name": "dasdasd",
    "__v": 0
},
{
    "_id": "672b8554e23b2c8d40154a65",
    "name": "dsaasd",
    "__v": 0
},
{
    "_id": "672b855fe23b2c8d40154a69",
    "name": "asdas",
    "__v": 0
},
{
    "_id": "672b8875e23b2c8d40154a6d",
    "name": "asdsad",
    "__v": 0
},
{
    "_id": "672b8875e23b2c8d40154a6f",
    "name": "asdasds",
    "__v": 0
},
{
    "_id": "672b92b4e23b2c8d40154a73",
    "name": "dsad",
    "__v": 0
},
{
    "_id": "672b9302e23b2c8d40154a77",
    "name": "dsadas",
    "__v": 0
},
{
    "_id": "672b931fe23b2c8d40154a7b",
    "name": "asddas",
    "__v": 0
},
{
    "_id": "672b933ee23b2c8d40154a7f",
    "name": "sadsa",
    "__v": 0
},
{
    "_id": "672b938ee23b2c8d40154a83",
    "name": "dassda",
    "__v": 0
},
{
    "_id": "672b93a0e23b2c8d40154a87",
    "name": "adasd",
    "__v": 0
},
{
    "_id": "672b93b9e23b2c8d40154a8b",
    "name": "fsddfs",
    "__v": 0
},
{
    "_id": "672b93ebe23b2c8d40154a8f",
    "name": "asdasd",
    "__v": 0
},
{
    "_id": "672b9403e23b2c8d40154a93",
    "name": "asdasd",
    "__v": 0
},
{
    "_id": "672b940fe23b2c8d40154a97",
    "name": "dasasd",
    "__v": 0
},
{
    "_id": "672b942ae23b2c8d40154a9b",
    "name": "sadasd",
    "__v": 0
},
{
    "_id": "672b94f0e23b2c8d40154a9f",
    "name": "dsaasd",
    "__v": 0
},
{
    "_id": "672b9546e23b2c8d40154aa3",
    "name": "asdasd",
    "__v": 0
},
{
    "_id": "672ba204e23b2c8d40154aa7",
    "name": "sadsad",
    "__v": 0
},
{
    "_id": "672ba387e23b2c8d40154aab",
    "name": "dasasd",
    "__v": 0
},
{
    "_id": "672bf78808b3d3bad63c2cf8",
    "name": "dsadas",
    "__v": 0
},
{
    "_id": "672bf9ac08b3d3bad63c2cfc",
    "name": "dsaasd",
    "__v": 0
},
{
    "_id": "672bfb5408b3d3bad63c2d00",
    "name": "asdasd",
    "__v": 0
},
{
    "_id": "672bfd8108b3d3bad63c2d04",
    "name": "fdsfsd",
    "__v": 0
},
{
    "_id": "672bfe1108b3d3bad63c2d08",
    "name": "fsdfsd",
    "__v": 0
},
{
    "_id": "672c032008b3d3bad63c2d0c",
    "name": "dassad",
    "__v": 0
},
{
    "_id": "672c0f2008b3d3bad63c2d10",
    "name": "das",
    "__v": 0
},
{
    "_id": "672c0f4208b3d3bad63c2d14",
    "name": "sadasd",
    "__v": 0
},
{
    "_id": "672c120f08b3d3bad63c2d18",
    "name": "asd",
    "__v": 0
},
{
    "_id": "672c149f08b3d3bad63c2d1c",
    "name": "dasasd",
    "__v": 0
},
{
    "_id": "672c163e08b3d3bad63c2d20",
    "name": "asdsda",
    "__v": 0
},
{
    "_id": "672c1a7508b3d3bad63c2d24",
    "name": "asdasd",
    "__v": 0
},
{
    "_id": "672c1b1508b3d3bad63c2d28",
    "name": "jnuio",
    "__v": 0
},
{
    "_id": "672c1b5108b3d3bad63c2d2c",
    "name": "kok",
    "__v": 0
},
{
    "_id": "672c1c6108b3d3bad63c2d30",
    "name": "asdasd",
    "__v": 0
},
{
    "_id": "672c1ce108b3d3bad63c2d34",
    "name": "asddas",
    "__v": 0
},
{
    "_id": "672c1e2908b3d3bad63c2d38",
    "name": "das",
    "__v": 0
},
{
    "_id": "672c1f7d08b3d3bad63c2d3c",
    "name": "asdsda",
    "__v": 0
},
{
    "_id": "672ca7f208b3d3bad63c2d40",
    "name": "sad",
    "__v": 0
},
{
    "_id": "672ca81608b3d3bad63c2d44",
    "name": "dsa",
    "__v": 0
},
{
    "_id": "672cae3f08b3d3bad63c2d48",
    "name": "dasdasd",
    "__v": 0
},
{
    "_id": "672cb31f08b3d3bad63c2d4c",
    "name": "asdsad",
    "__v": 0
},
{
    "_id": "672cb34a08b3d3bad63c2d50",
    "name": "asdsda",
    "__v": 0
},
{
    "_id": "672cb37908b3d3bad63c2d54",
    "name": "asdsd",
    "__v": 0
},
{
    "_id": "672cb45008b3d3bad63c2d58",
    "name": "1233",
    "__v": 0
},
{
    "_id": "672cb46f08b3d3bad63c2d5a",
    "name": "asdasd",
    "__v": 0
},
{
    "_id": "672cb4c108b3d3bad63c2d5e",
    "name": "asdasd",
    "__v": 0
},
{
    "_id": "672cb74c08b3d3bad63c2d62",
    "name": "asdsd",
    "__v": 0
},
{
    "_id": "672cbe4508b3d3bad63c2d66",
    "name": "sadasd",
    "__v": 0
},
{
    "_id": "672cbe7108b3d3bad63c2d6a",
    "name": "dasds",
    "__v": 0
},
{
    "_id": "672cbe9708b3d3bad63c2d6e",
    "name": "asdsad",
    "__v": 0
},
{
    "_id": "672cbf6308b3d3bad63c2d72",
    "name": "asddsa",
    "__v": 0
},
{
    "_id": "672cbfa108b3d3bad63c2d76",
    "name": "asdas",
    "__v": 0
},
{
    "_id": "672cbfb908b3d3bad63c2d7a",
    "name": "sadasd",
    "__v": 0
},
{
    "_id": "672cca0f08b3d3bad63c2d7e",
    "name": "asdsa",
    "__v": 0
},
{
    "_id": "672cce3608b3d3bad63c2d84",
    "name": "asd",
    "__v": 0
},
{
    "_id": "672ccef608b3d3bad63c2d88",
    "name": "asdas",
    "__v": 0
},
{
    "_id": "672cd05b08b3d3bad63c2d8e",
    "name": "asdsad",
    "__v": 0
},
{
    "_id": "672cd29308b3d3bad63c2d94",
    "name": "asda",
    "__v": 0
},
{
    "_id": "672cd39a08b3d3bad63c2d9a",
    "name": "asdasd",
    "__v": 0
},
{
    "_id": "672cd3bc08b3d3bad63c2da0",
    "name": "asdas",
    "__v": 0
},
{
    "_id": "672cd42508b3d3bad63c2da6",
    "name": "asdasd",
    "__v": 0
},
{
    "_id": "672cd8218f0e49358b19c47f",
    "name": "asdasd",
    "__v": 0
},
{
    "_id": "672cd9998f0e49358b19c485",
    "name": "asdas",
    "__v": 0
},
{
    "_id": "672ce6bc8f0e49358b19c48b",
    "name": "DASSDA",
    "__v": 0
},
{
    "_id": "672d3a21acb62383f7995771",
    "name": "dasds",
    "__v": 0
},
{
    "_id": "672d3bbcacb62383f799577c",
    "name": "dsasad",
    "__v": 0
},
{
    "_id": "672d3c20acb62383f7995780",
    "name": "sdaasdasd",
    "__v": 0
},
{
    "_id": "672d3c3aacb62383f7995783",
    "name": "dasassdaasd",
    "__v": 0
},
{
    "_id": "672d3c50acb62383f7995785",
    "name": "asdsadasd",
    "__v": 0
},
{
    "_id": "672d3e47acb62383f7995790",
    "name": "asdsad",
    "__v": 0
},
{
    "_id": "672d429cacb62383f79957a7",
    "name": "sdsda",
    "__v": 0
},
{
    "_id": "672d446eacb62383f79957b8",
    "name": "asdasd",
    "__v": 0
},
{
    "_id": "672d4535acb62383f79957c9",
    "name": "asdasd",
    "__v": 0
},
{
    "_id": "672e04eba8e893085cb267e8",
    "name": "sadasd",
    "__v": 0
},
{
    "_id": "672e0528a8e893085cb267f2",
    "name": "asdsad",
    "__v": 0
},
{
    "_id": "672e056da8e893085cb267fc",
    "name": "asd",
    "__v": 0
},
{
    "_id": "672e062ca8e893085cb2680f",
    "name": "sadsad",
    "__v": 0
},
{
    "_id": "672e06b4a8e893085cb26825",
    "name": "asdasd",
    "__v": 0
},
{
    "_id": "672e07aca8e893085cb26843",
    "name": "asdsda",
    "__v": 0
},
{
    "_id": "672e080aa8e893085cb26853",
    "name": "sASa",
    "__v": 0
},
{
    "_id": "672e081ca8e893085cb26860",
    "name": "asd",
    "__v": 0
},
{
    "_id": "672e089ba8e893085cb26878",
    "name": "asdasd",
    "__v": 0
},
{
    "_id": "672e092fa8e893085cb26892",
    "name": "dasdas",
    "__v": 0
},
{
    "_id": "672e0cdca8e893085cb2692b",
    "name": "asd",
    "__v": 0
},
{
    "_id": "672e0d0da8e893085cb2693a",
    "name": "asd",
    "__v": 0
},
{
    "_id": "672e0d47a8e893085cb26949",
    "name": "asdasd",
    "__v": 0
},
{
    "_id": "672e0e51a8e893085cb2697c",
    "name": "asdasd",
    "__v": 0
},
{
    "_id": "672e0f85a8e893085cb269bc",
    "name": "asd",
    "__v": 0
},
{
    "_id": "672e0ff3a8e893085cb269dc",
    "name": "sdsad",
    "__v": 0
},
{
    "_id": "672e1016a8e893085cb269f2",
    "name": "sadasd",
    "__v": 0
},
{
    "_id": "672e10bca8e893085cb26a18",
    "name": "dasdass",
    "__v": 0
},
{
    "_id": "672e191aa8e893085cb26c3c",
    "name": "huhu",
    "__v": 0
},
{
    "_id": "672e1936a8e893085cb26c4f",
    "name": "dasasd",
    "__v": 0
},
{
    "_id": "672e42c216e15d1df019b606",
    "name": "asdsd",
    "__v": 0
},
{
    "_id": "672e4a5016e15d1df019b611",
    "name": "sdsad",
    "__v": 0
},
{
    "_id": "672e4b3b16e15d1df019b61c",
    "name": "sda",
    "__v": 0
},
{
    "_id": "672e4f0316e15d1df019b630",
    "name": "asd",
    "__v": 0
},
{
    "_id": "6735e151ab9a2ebfef53f96e",
    "name": "João Silva",
    "__v": 0
},
{
    "_id": "6735e1d456c374295b744588",
    "name": "João Silva",
    "__v": 0
},
{
    "_id": "6735e1d956c374295b74458e",
    "name": "João Silva",
    "__v": 0
}
]

const sessionIdsToDelete = [
];

const userIdsToDelete = usersToDelete.map(user => user._id.toString());
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