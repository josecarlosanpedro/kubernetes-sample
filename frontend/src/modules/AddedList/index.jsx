
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import View from './View';

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    services: bindActionCreators(
      {
      },
      dispatch,
    ),
    dispatch,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View);