import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                const { username, password, host, port, dbName } = configService.database;
                return {
                    type: 'postgres',
                    host,
                    port,
                    username: username,
                    password,
                    database: dbName,
                    autoLoadEntities: true,
                    synchronize: true,
                    entities: [__dirname + "/../**/*.entity.{js,ts}"]
                };
            },
        }),
    ],
    exports: [
        TypeOrmModule
    ]
})
export class DatabaseModule { }
