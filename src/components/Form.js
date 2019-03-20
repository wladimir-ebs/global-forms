import React, { PureComponent } from 'react';
import { withForm } from '../former';

class Form extends PureComponent {
  componentDidMount() {
    this.props.initForm({
      fields: [
        {
          type: 'input',
          target: 'name',
          label: 'Name',
          placeholder: 'Enter your name ..',
        },
        {
          type: 'input-number',
          target: 'age',
          label: 'Age',
          min: 0,
          max: 100,
          placeholder: 'Enter your age ..',
        },
        {
          type: 'checkbox',
          target: 'criteria',
          label: 'Criteria',
          nomenclature: [
            { id: 1, title: 'Company with Phone number' },
            { id: 2, title: 'Company with Email' },
            { id: 3, title: 'Company with Telephone' },
          ],
        },
        {
          type: 'radio',
          target: 'strict',
          label: 'Strict',
          nomenclature: [{ id: 0, title: 'No' }, { id: 1, title: 'Yes' }],
        },
      ],
      onRequest: () => {
        global.console.log('request from Form component');
      },
      onSuccess: () => {
        global.console.log('in case of success');
      },
      onFail: () => {
        global.console.log('in case of fail');
      },
    });
  }

  render() {
    return <div style={{ margin: '25px auto', maxWidth: 500 }}>{this.props.renderForm()}</div>;
  }
}

export default withForm()(Form);
