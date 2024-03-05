# Summary

Here will be displayed differences between several architectures and described what are adventages of microfrontend architecture.

## Summary of graphs

### NPM library

Developer works out of normal workspace, in the library.

Every time "Header" or "Footer" components are changed a version of the library needs to be updated, to see that update "Home" and "PDP" app also need to update the version of the npm library, and to be redeployed (kinde of the hustle).

If library is updated on one app and not on another, it will not look nice if user is using cross apps feature.

It would be nice if the change happens imediatelly

### Module federation

PDP app connects directly to the components. We get dynamic behaviour, whenever "Home app" is updated, automatically the components exported by that project are updated. Developers working always in same workspace.

Down side is that, the components are not accessible if the app that export the is not running.

## Asynchronous loading

`const Header = React.lazy(() => import("home/Header"));`

Components can be loaded asynchronously. Import of components can be deffered until it

```
const App = () => {
  const [showHeader, setShowHeader] = useState(false);
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      {showHeader && (
        <Suspense fallback={<div>Loading</div>}>
          <Header />
        </Suspense>
      )}
      <button
        onClick={() => setShowHeader((prev) => !prev)}
        className="text-3xl p-5"
      >
        toggle header
      </button>
      PDP Page Content
      <Footer />
    </div>
  );
};
```

The header will not be loaded until there is an attempt to render it.

In this example when header is loaded it comes up with size of 1.1kb, it is like that because there is a key in webpack.config.js:

```
const deps = require("./package.json").dependencies;

shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
```

That will take care that on the page will be only one react and react-dom. When import component it basically brings only code related to header and required dependencies that are missing.

## Error handling

### What happens when the app goes down?

If the app that export component is down, the apps that import that component will go down also by default, but that is handled by deploying Module federation app to static asset store. The Module federation app will be built and deployed to a static asset store like S3.

How to test that:

- Go to the home app and run `yarn build`, that will create a local directory called dist.
- Go into dist, it will be just .js files
- run `PORT=8000 npx servor` , that will simulate static asset store

After these steps the pdp app will be back. So basically as lon as static asset store is working there is no issues.

**The main issues is actually if the developer that is working on component that is exported break the API contract, that will break the app that imports the component.**

The trick to avoid breaking the API contract is to use Error boundaries:

```
import React from 'react';

export default class SafeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromProps(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>
    }

    return this.props.children;
  }
}

```

```
<SafeComponent>
  <Header />
</SafeComponent>
```
