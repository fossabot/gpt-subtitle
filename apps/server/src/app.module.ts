import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TranslateModule } from "./translate/translate.module";
import { UploadModule } from "./upload/upload.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { OsrtModule } from "./osrt/osrt.module";
import { BullModule } from "@nestjs/bull";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesModule } from "./files/files.module";
import { SharedModule } from "./shared/shared.module";
import { StaticDirModule } from "./static-dir.provider";

const {
  REDIS_PORT = 6379,
  REDIS_HOST = "localhost",
  MYSQL_HOST = "localhost",
  MYSQL_PORT = 3306,
  MYSQL_USER = "root",
  MYSQL_PASSWORD = "123456",
  MYSQL_DATABASE = "gpt_subtitle",
} = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: MYSQL_HOST,
      port: +MYSQL_PORT,
      username: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: REDIS_HOST,
        port: +REDIS_PORT,
      },
    }),
    ConfigModule.forRoot({
      envFilePath: [
        ".env.development.local",
        ".env.development",
        ".env",
        ".env.local",
      ],
    }),
    // MulterModule.register({
    //   dest: "./uploads",
    // }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "..", "uploads"),
      serveRoot: "/static",
    }),

    TranslateModule,

    UploadModule,
    OsrtModule,
    FilesModule,
    SharedModule,
    StaticDirModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
