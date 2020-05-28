import {
    Controller,
    Body,
    Post,
    UseGuards,
    Get,
    Param,
    ParseIntPipe,
    Delete,
    Put,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { CreateClientDto } from './dto/create-client.dto'; // leo
import { AuthGuard } from '@nestjs/passport';
import { Client as ClientEntity } from './client.entity';
import { ClientDto } from './dto/client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsService } from './clients.service';

@Controller('clients')
@ApiTags('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @Get()
    @ApiOkResponse({ type: [ClientDto] })
    findAll(): Promise<ClientDto[]> {
        return this.clientsService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: ClientDto })
    @ApiParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<ClientDto> {
        return this.clientsService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: ClientEntity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createClientDto: CreateClientDto): Promise<ClientEntity> {
        return this.clientsService.create(createClientDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: ClientDto })
    @ApiParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updateClientDto: UpdateClientDto,
    ): Promise<ClientDto> {
        return this.clientsService.update(id, updateClientDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: ClientDto })
    @ApiParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    delete(@Param('id', new ParseIntPipe()) id: number): Promise<ClientDto> {
        return this.clientsService.delete(id);
    }
}
