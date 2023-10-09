/***
 * - Loads (imports/requires) all NPM module dependences
 * - Exports all the dependencies as globals
 */

// Load (import/require) dependecies 
import {
  readFileSync, writeFileSync, statSync,
  renameSync, mkdirSync, rmSync, existsSync
} from "fs";
import { execSync } from 'child_process';
import { PDFDocument } from 'pdf-lib';
import puppeteer from 'puppeteer';
import pptxgen from "pptxgenjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { marpCli } = require('@marp-team/marp-cli');
const sharp = require('sharp');


// Export dependencies
export {
  readFileSync, writeFileSync, statSync,
  renameSync, mkdirSync, rmSync, existsSync,
  execSync,
  PDFDocument,
  puppeteer,
  pptxgen,
  marpCli,
  sharp
};