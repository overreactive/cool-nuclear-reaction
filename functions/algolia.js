// Initialize Algolia, requires installing Algolia dependencies:
// https://www.algolia.com/doc/api-client/javascript/getting-started/#install
//
// App ID and API Key are stored in functions config variables
const ALGOLIA_ID = functions.config().algolia.app_id
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key

const ALGOLIA_INDEX_NAME = 'projects'
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

function indexProject(snap, context) {
  // Get the project document
  const project = snap.data()

  // Add an 'objectID' field which Algolia requires
  project.objectID = context.params.projectId

  // Write to the algolia index
  const index = client.initIndex(ALGOLIA_INDEX_NAME)
  console.log("index: ", index);
  return index.saveObject(project)
}

module.exports = {
  indexProject
}
