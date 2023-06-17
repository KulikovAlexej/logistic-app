import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('geo_point')
export class GeoPointEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column('numeric')
  longitude: number;

  @Column('numeric')
  latitude: number;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => User)
  creator: User;
}
