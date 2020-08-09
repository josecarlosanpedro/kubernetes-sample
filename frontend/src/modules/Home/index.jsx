
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsersEpics } from '../../stores/modules/home/home.actions'
import View from './View';

function mapStateToProps(state) {
  return {
    users: state.Home.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    services: bindActionCreators(
      {
        getUsersEpics
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