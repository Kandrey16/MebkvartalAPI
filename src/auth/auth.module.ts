import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './resolvers/auth.resolver';
import { TokenRepository } from './repository/token.repository';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers/auth.controller';
import { MailModule } from 'src/mail/mail.module'
import { MailService } from 'src/mail/mail.service'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    MailModule,
  ],
  providers: [
    AuthResolver,
    AuthService,
    TokenService,
    MailService,
    TokenRepository,
  ],
  controllers: [AuthController],
  exports: [JwtModule, TokenService],
})
export class AuthModule {}
