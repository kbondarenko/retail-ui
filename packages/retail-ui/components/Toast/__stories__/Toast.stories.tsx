import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Toast } from '..';
import { Button } from '../../Button';
import { Modal } from '../../Modal';
import { Nullable } from '../../../typings/utility-types';

class TestNotifier extends React.Component<any, any> {
  public state = {
    modal: false,
  };

  private notifier: Nullable<Toast>;

  public render() {
    return (
      <div>
        <Toast ref={el => (this.notifier = el)} onClose={action('close')} onPush={action('push')} />
        <Button onClick={this.showNotification}>Show notification</Button>
        <Button onClick={() => this.setState({ modal: true })}>Show Modal</Button>
        {this.state.modal && this.renderModal()}
      </div>
    );
  }

  private showNotification = () => {
    if (this.props.complex) {
      this.showComplexNotification();
    } else {
      this.showSimpleNotification();
    }
  };

  private showSimpleNotification() {
    if (this.notifier) {
      this.notifier.push('Successfully saved');
    }
  }

  private showComplexNotification() {
    if (this.notifier) {
      this.notifier.push('Successfully saved', {
        label: 'Cancel',
        handler: action('cancel_save'),
      });
    }
  }

  private renderModal() {
    return (
      <Modal>
        <Modal.Header>Modalka</Modal.Header>
        <Modal.Body>
          <Button onClick={this.showNotification}>Show notification</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.setState({ modal: false })}>Close Modal</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

storiesOf('Toast', module)
  .add('simple notifiacation', () => <TestNotifier />)
  .add('complex notifiacation', () => <TestNotifier complex />)
  .add('static method', () => (
    <Button onClick={() => Toast.push('Static method call')}>Show static</Button>
  ));
