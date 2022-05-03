const fs = require('fs');
const path = require('path');
const child_process = require("child_process");

const getFiles = (folderPath) => {
  try {
    let res = [];
    const list = fs.readdirSync(folderPath, { withFileTypes: true }) || [];

    list.forEach((item) => {
      const { name } = item;

      const childPath = path.resolve(folderPath, name);

      if (item.isDirectory()) {
        const childFiles = getFiles(childPath);

        res = [...res, ...childFiles];
      } else {
        const curr = {
          filePath: path.resolve(folderPath, name),
          content: fs.readFileSync(childPath, 'utf8'),
        };

        res = res.concat(curr);
      }
    });

    return res;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const FILES_PATH = path.resolve(__dirname, './files');
const RUNTIME_PATH = path.resolve(__dirname, './runtime');
const INDEX_PATH = path.resolve(__dirname, '../index.js');

const files = getFiles(FILES_PATH);
const icludes = (list = []) => {
  list = getFiles(RUNTIME_PATH).map((item = {}) => {
    const { filePath: itemFilePath = '', ...others } = item;

    const filePath = itemFilePath.replace(RUNTIME_PATH, FILES_PATH);

    return { filePath, ...others };
  });

  return list.every((item = {}) => {
    const keys = Object.keys(item) || [];

    return files.some((file = {}) => keys.every(
      (key) => item[key] === file[key],
    ));
  });
};

beforeEach(() => {
  if (fs.existsSync(RUNTIME_PATH)) {
    child_process.execSync(`rm -rf ${RUNTIME_PATH}`);
  }

  fs.mkdirSync(RUNTIME_PATH);
});

afterEach(() => {
  if (fs.existsSync(RUNTIME_PATH)) {
    child_process.execSync(`rm -rf ${RUNTIME_PATH}`);
  }
});

test('create component class', () => {
  child_process.execSync(`node ${INDEX_PATH} ComponentClass`,{ cwd: RUNTIME_PATH });

  const list = getFiles(RUNTIME_PATH);
  const included = icludes(list);

  expect(included).toBe(true);
});

test('create component function', () => {
  child_process.execSync(`node ${INDEX_PATH} ComponentFunction -f`,{ cwd: RUNTIME_PATH });

  const list = getFiles(RUNTIME_PATH);
  const included = icludes(list);

  expect(included).toBe(true);
});

test('create component function with hooks', () => {
  child_process.execSync(`node ${INDEX_PATH} ComponentFunctionHooks -f -h`,{ cwd: RUNTIME_PATH });

  const list = getFiles(RUNTIME_PATH);
  const included = icludes(list);

  expect(included).toBe(true);
});

test('create single component class', () => {
  child_process.execSync(`node ${INDEX_PATH} ComponentClassSingle -s`,{ cwd: RUNTIME_PATH });

  const list = getFiles(RUNTIME_PATH);
  const included = icludes(list);

  expect(included).toBe(true);
});

test('create single component function', () => {
  child_process.execSync(`node ${INDEX_PATH} ComponentFunctionSingle -f -s`,{ cwd: RUNTIME_PATH });

  const list = getFiles(RUNTIME_PATH);
  const included = icludes(list);

  expect(included).toBe(true);
});

test('create page class', () => {
  child_process.execSync(`node ${INDEX_PATH} PageClass -p`,{ cwd: RUNTIME_PATH });

  const list = getFiles(RUNTIME_PATH);
  const included = icludes(list);

  expect(included).toBe(true);
});

test('create page function', () => {
  child_process.execSync(`node ${INDEX_PATH} PageFunction -p -f`,{ cwd: RUNTIME_PATH });

  const list = getFiles(RUNTIME_PATH);
  const included = icludes(list);

  expect(included).toBe(true);
});

test('create page function with hooks', () => {
  child_process.execSync(`node ${INDEX_PATH} PageFunctionHooks -p -f -h`,{ cwd: RUNTIME_PATH });

  const list = getFiles(RUNTIME_PATH);
  const included = icludes(list);

  expect(included).toBe(true);
});

test('create single page class', () => {
  child_process.execSync(`node ${INDEX_PATH} PageClassSingle -p -s`,{ cwd: RUNTIME_PATH });

  const list = getFiles(RUNTIME_PATH);
  const included = icludes(list);

  expect(included).toBe(true);
});

test('create single page function', () => {
  child_process.execSync(`node ${INDEX_PATH} PageFunctionSingle -p -f -s`,{ cwd: RUNTIME_PATH });

  const list = getFiles(RUNTIME_PATH);
  const included = icludes(list);

  expect(included).toBe(true);
});

test('create ant typescript component function', () => {
  child_process.execSync(`node ${INDEX_PATH} AntComponentFunction -a`,{ cwd: RUNTIME_PATH });

  const list = getFiles(RUNTIME_PATH);
  const included = icludes(list);

  expect(included).toBe(true);
});
