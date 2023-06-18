import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { GeoPointEntity } from '../geo-points/geo-point.entity';

@Entity()
export class GeoGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => User)
  creator: User;

  @OneToMany(() => GeoPointEntity, (geoPoint) => geoPoint.group)
  geoPoints: GeoPointEntity[];
}
