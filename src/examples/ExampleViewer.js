import React from 'react';
import sizeMe from 'react-sizeme';

const ExampleViewer = ({ example, size }) => {
  let exampleContent = null;

  if (example) {
    const {
      component: ExampleComponent,
      url,
    } = example;
    exampleContent = (<ExampleComponent width={size.width} height={size.height} />);
  }

  return (
    <div id="viewer">
      {exampleContent}
    </div>
  );
};

ExampleViewer.propTypes = {
  example: React.PropTypes.object,
  size: React.PropTypes.object,
};

export default sizeMe({ monitorHeight: true, refreshRate: 200 })(ExampleViewer);
