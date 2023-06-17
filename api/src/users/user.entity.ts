import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from './consts/user-roles.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  patronymic: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: UserRoles, array: true, default: [] })
  roles: UserRoles[];
}
