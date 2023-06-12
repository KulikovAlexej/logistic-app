import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: true })
  roles: string;
}
