import React, { PureComponent } from 'react';
import { Form, Button, Alert } from 'antd';
import { FormTarget, Loader } from './';

const indexed = arr => arr.map((item, key) => ({ key, ...item }));

let timer;
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

    componentWillUnmount() {
      timer && clearTimeout(timer);
    }

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

      this.setState({ detail: '', error: {}, loading: true });

      try {
        this.onRequest && (await this.onRequest(this.state.values));
        this.onSucces && (await this.onSucces());

        this.setState({ loading: false });
      } catch (err) {
        this.onFail && (await this.onFail());

        this.setState({
          detail: err.response ? err.response.detail : '',
          error: err.response ? err.response.data : {},
          loading: false,
        });

        global.console.error(err);
      }
    }

    async onReset(options) {
      await this.setState({ loading: true });

      timer = setTimeout(() => this.setState({ loading: false, values: {} }), 1000);
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
          <Form onSubmit={ev => this.onSubmit(ev)} className="zh-form">
            {detail && <Alert message={detail} type="error" showIcon />}
            <div className="zh-form-reset" onClick={() => this.onReset()} role="presentation">
              Reset
            </div>

            {indexed(fields).map(({ key, ...item }) => (
              <FormTarget
                key={key}
                {...item}
                value={values[item.target]}
                onChange={value => this.onTargetChange(item.target, value)}
                error={errors[item.target]}
              />
            ))}

            {this.onCancel && <Button onClick={this.onCancel}>Cancel</Button>}
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
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
