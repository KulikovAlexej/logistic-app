import {Controller, Get} from '@nestjs/common';
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @Get()
    getHello(): string {
        return 'users page';
    }

    @Get('create')
    create(): string {
        return 'create user page'
    }


    // @Get('all')
    // async getAll(): Promise<User[]> {
    //     return await this.userService.findAll()
    // }

    @Get('all')
    getAll(): string {
        this.userService.findAll().then(v => console.log(v)).catch(e => console.log(e))
        return 'get all';
    }
}
