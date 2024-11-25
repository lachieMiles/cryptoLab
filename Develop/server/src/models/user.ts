import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import bcrypt from 'bcrypt';

interface UserAttributes {
    id: number;
    username: string;
    password: string;
    email: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public async setPassword(password: string) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds);
    }
}

export function UserFactory(sequelize: Sequelize): typeof User {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Username is required" },
                    notContains: { args: ' ', msg: "Username cannot contain spaces" },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            }, 
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'users',
            sequelize,
            hooks: {
                beforeCreate: async (user: User) => {
                    await user.setPassword(user.password);
                },
                beforeUpdate: async (user: User) => {
                    if (user.changed('password')) {
                        await user.setPassword(user.password);
                    }
                },
            }
        }
    );

    return User;
}