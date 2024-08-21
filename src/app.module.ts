import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    StudentModule,
    AdminModule,
    TeacherModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
