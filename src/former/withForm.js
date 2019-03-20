import React, { PureComponent } from 'react';
import { Form, Button, Alert } from 'antd';
import { FormTarget, Loader } from './';

const indexed = arr => arr.map((item, key) => ({ key, ...item }));

const withForm = options => Component =>
  class extends PureComponent {
    state = {
      values: {},
      fields: [],
      detail: '',
      errors: {},
      loading: true,
    };

    onCancel = null;
    onRequest = null;
    onSuccess = null;
    onFail = null;

    onTargetChange(target, value) {
      return this.setState(({ values }) => ({
        values: {
          ...values,
          [target]: value,
        },
      }));
    }

    async onSubmit(ev) {
      ev.preventDefault();

      this.setState({ detail: '', error: {}, loading: false });

      try {
        this.onRequest && (await this.onRequest());

        this.setState({ loading: false });
      } catch (err) {
        this.setState({ detail: '', error: {}, loading: false });

        global.console.log(err);
      }
    }

    initForm(options) {
      const { fields, onCancel, onRequest, onSuccess, onFail } = options;

      this.onCancel = onCancel;
      this.onRequest = onRequest;
      this.onSuccess = onSuccess;
      this.onFail = onFail;

      this.setState({
        fields,
        loading: false,
      });
    }

    renderForm() {
      const { fields, errors, values, loading, detail } = this.state;

      return (
        <Loader loading={loading}>
          <Form onSubmit={ev => this.onSubmit(ev)}>
            {detail && <Alert message={detail} type="error" showIcon />}

            {indexed(fields).map(({ key, ...item }) => (
              <FormTarget
                key={key}
                {...item}
                value={values[item.target]}
                onChange={value => this.onTargetChange(item.target, value)}
                error={errors[item.target]}
              />
            ))}

            <Button htmlType="submit">Submit</Button>
          </Form>
        </Loader>
      );
    }

    render() {
      const { ...state } = this.state;
      const { ...props } = this.props;

      return (
        /* eslint-disable react/jsx-no-bind */
        <Component {...state} {...props} initForm={this.initForm.bind(this)} renderForm={this.renderForm.bind(this)} />
        /* eslint-enable react/jsx-no-bind */
      );
    }
  };

export default withForm;
