import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { writeFile } from 'fs/promises';
import { generate } from 'openapi-typescript-codegen';
import { stringify } from 'yaml';

type GenerateDocumentOption = {
  fileExtension: 'yaml' | 'json';
  destinationPath: string;
  fileName: string;
};

type GenerateClientOption = {
  destinationPath: string;
};

type ServerOption = {
  prefix: string;
};

type DefaultOpenApiOption = {
  server: ServerOption;
  generateDocument?: Partial<GenerateDocumentOption>;
};

type ClientOpenApiOption = {
  server: ServerOption;
  generateDocument: Required<GenerateDocumentOption>;
  generateClient: Required<GenerateClientOption>;
};

type OpenApiOptions = DefaultOpenApiOption | ClientOpenApiOption;

export async function enableOpenApi(
  app: INestApplication<unknown>,
  options?: OpenApiOptions,
) {
  const documentBuilder = new DocumentBuilder().setTitle('My Api');
  const document = SwaggerModule.createDocument(app, documentBuilder.build());

  SwaggerModule.setup(options.server.prefix, app, document);

  if (!('generateDocument' in options)) {
    return;
  }

  await generateOpenAPIClient(document, options);
}

export async function generateOpenAPIClient(
  document: OpenAPIObject,
  options: OpenApiOptions,
) {
  let swaggerDocument = JSON.parse(JSON.stringify(document));

  if (options.generateDocument.fileExtension === 'yaml') {
    swaggerDocument = stringify(swaggerDocument);
  }

  const path = `${options.generateDocument.destinationPath}/${options.generateDocument.fileName}.${options.generateDocument.fileExtension}`;
  await writeFile(path, swaggerDocument);

  if (!('generateClient' in options)) {
    return;
  }

  await generate({
    input: `${path}`,
    output: options.generateClient.destinationPath,
    clientName: options.generateDocument.fileName
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(''),
  });
}
