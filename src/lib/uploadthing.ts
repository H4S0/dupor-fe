import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
  type GenerateTypedHelpersOptions,
} from '@uploadthing/react';

const initOpts = {
  url: 'http://localhost:4000/api/uploadthing',
} satisfies GenerateTypedHelpersOptions;

export const UploadButton = generateUploadButton(initOpts);
export const UploadDropzone = generateUploadDropzone(initOpts);

export const { useUploadThing } = generateReactHelpers(initOpts);
