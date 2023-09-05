module.exports = {
  '**/*': filenames => [`npm run format:fix ${filenames.join(' ')}`],
  '**/*.(md|json)': filenames => `npm run format:fix ${filenames.join(' ')}`,
  '**/*.(ts|tsx|js)': filenames => 'next lint'
}
