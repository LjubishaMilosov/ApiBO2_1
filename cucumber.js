// module.exports = {
//     default: '--require-module ts-node/register --require features/step_definitions/**/*.ts --format progress --publish-quiet'
//   };

module.exports = {
  default: `--require-module ts-node/register --require src/step-definitions/**/*.ts src/features/**/*.feature`
};