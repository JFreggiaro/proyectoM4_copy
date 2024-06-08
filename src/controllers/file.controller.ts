import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { FileService } from '../services/files.service';

@ApiTags('File')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ summary: 'Cargar Imagen' })
  @ApiResponse({ status: 201, description: 'Imagen Cargada'})
  @ApiResponse({ status: 400, description: 'Error al cargar la imagen'})
  @ApiBearerAuth()
  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiParam({ name: 'id', description:"Id del producto"})
  async uploadFile(@Param('id', ParseUUIDPipe) id: string, @UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({
        maxSize: 2000000,
        message: 'El tamano maximo es de 2MB',
      }),
      new FileTypeValidator({
        fileType: /(jpg|jpeg|png|gif|svg)$/,
      }),
    ],
  })) files: Express.Multer.File) {
    return await this.fileService.uploadFile(files, id);
  }
}
