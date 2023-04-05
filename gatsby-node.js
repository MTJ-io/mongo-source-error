const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

async function createStudentPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMongodbStudents {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);
  if (result.errors) {
    throw result.errors;
  }
  const students = result.data.allMongodbStudents.edges || [];

  students.forEach((edge, index) => {
    const studentSlug = edge.node.slug.trim();

    const path = `/students/${studentSlug}`;

    createPage({
      path,
      component: require.resolve('./src/templates/student.tsx'),
      context: {
        id: edge.node.id,
      },
    });
  });
}

async function createProjectPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMongodbProjects {
        edges {
          node {
            id
            slug
            members {
              slug
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    throw result.errors;
  }
  const projects = result.data.allMongodbProjects.edges || [];

  projects.forEach((edge, index) => {
    const projectSlug = edge.node.slug.trim();

    const path = `/projects/${projectSlug}`;

    createPage({
      path,
      component: require.resolve('./src/templates/project.tsx'),
      context: {
        id: edge.node.id,
      },
    });
  });
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createStudentPages(graphql, actions, reporter);
  await createProjectPages(graphql, actions, reporter);
};
