// eslint-rules/require-tesc-tags-field.ts
import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) => `mosaic-e2e-tests/${name}`
);

export default createRule({
  name: 'require-tesc-tags-field',
  meta: {
    type: 'problem',
    docs: {
      description: 'Require test cases to have a tags field in config object',
    },
    fixable: 'code',
    messages: {
      missingTagsField:
        'Test case must have a tags field in its configuration object',
      missingTagsStartingWithTESC:
        'Test case tags must include at least one tag starting with "TESC"',
      tagsNotArray: 'Tags field must be an array',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node: TSESTree.CallExpression) {
        // Check if it's an it call
        if (node.callee.type === 'Identifier' && node.callee.name === 'it') {
          const titleArg = node.arguments[0];
          const configArg = node.arguments[1];

          // Check if using the old style (no config object)
          if (
            configArg &&
            (configArg.type === 'FunctionExpression' ||
              configArg.type === 'ArrowFunctionExpression')
          ) {
            // Old style: it('title', function)
            context.report({
              node,
              messageId: 'missingTagsField',
              fix(fixer) {
                if (titleArg && configArg) {
                  return fixer.insertTextAfterRange(
                    [titleArg.range[1], titleArg.range[1]],
                    `, { tags: ['@TESC-0'] }`
                  );
                }
                return null;
              },
            });
            return;
          }

          // Check if there's a config object as second argument
          if (configArg && configArg.type === 'ObjectExpression') {
            const tagsProperty = configArg.properties.find(
              (prop): prop is TSESTree.Property =>
                prop.type === 'Property' &&
                prop.key.type === 'Identifier' &&
                prop.key.name === 'tags'
            );

            if (!tagsProperty) {
              context.report({
                node: configArg,
                messageId: 'missingTagsField',
                fix(fixer) {
                  const lastProp =
                    configArg.properties[configArg.properties.length - 1];
                  const insertPosition = lastProp
                    ? lastProp.range[1]
                    : configArg.range[0] + 1;
                  const prefix = configArg.properties.length > 0 ? ', ' : '';
                  return fixer.insertTextAfterRange(
                    [insertPosition, insertPosition],
                    `${prefix}tags: ['@TESC-0']`
                  );
                },
              });
            } else {
              // Check if tags is an array
              if (tagsProperty.value.type !== 'ArrayExpression') {
                context.report({
                  node: tagsProperty,
                  messageId: 'tagsNotArray',
                });
                return;
              }

              // Check if at least one tag starts with TESC
              const tags = tagsProperty.value.elements
                .filter(
                  (el): el is TSESTree.Literal =>
                    el !== null &&
                    el.type === 'Literal' &&
                    typeof el.value === 'string'
                )
                .map((el) => el.value as string);

              const hasTESCTag = tags.some((tag) => tag.startsWith('@TESC-'));

              if (!hasTESCTag) {
                context.report({
                  node: tagsProperty,
                  messageId: 'missingTagsStartingWithTESC',
                  fix(fixer) {
                    const firstElement =
                      tagsProperty.value.type === 'ArrayExpression'
                        ? tagsProperty.value.elements[0]
                        : null;
                    const arrayExpression =
                      tagsProperty.value as TSESTree.ArrayExpression;
                    const insertPosition = firstElement
                      ? firstElement.range[0]
                      : arrayExpression.range[0] + 1;
                    const suffix =
                      arrayExpression.elements.length > 0 ? ', ' : '';
                    return fixer.insertTextBeforeRange(
                      [insertPosition, insertPosition],
                      `'@TESC-0'${suffix}`
                    );
                  },
                });
              }
            }
          }
        }
      },
    };
  },
});
