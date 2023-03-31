import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setLogin, setLogout } from 'src/pages/state';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  // const [state, dispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const initialized = useRef(false);

  const initialize = async () => {
    // 여기서 조회하면 될듯
    console.log('auth initialize');
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: '5e86809283e28b96d2d38537',
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Anika Visser',
        email: 'anika.visser@devias.io'
      };

      //dispatch({
      //  type: HANDLERS.INITIALIZE,
      //  payload: user
      //});
    } else {
      //dispatch({
      //  type: HANDLERS.INITIALIZE
      //});
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /**
   * Not use!!
   */
  const skip = () => {
    console.log('skip function');
    const dummyUser = {
      email:"shelter0420@naver.com",
      username:"seunghoon baek",
      companyName:"IndonBacco",
      phoneNo:"01028281027",
      address:"Indonesia somewhere",
      token:"eyJhbGciOiJIUz,UxMiJ9.eyJzdWIiOiIyIiwiaXNzIjoiaXRzc2VfY29tIiwiaWF0IjoxNjc5ODM2OTkzLCJleHAiOjE2Nzk5MjMzOTN9.W1wGNdkVPegzQocZo3OKdmPOCYlAAIjhvCVHl8KAnQRE651ZJZycEcZtCix8Zx4I4P-e8rjbeTYBALPhi73o4w",
      id:2
    }

    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    dispatch(setLogin({
      user: dummyUser
    }));
  };

  const signIn = async (email, password) => {
    //
    const signInResponse = await fetch(
      "https://eorder-was.herokuapp.com/sign-api/sign-in",
      //"http://localhost:8080/sign-api/sign-in",
      {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
      }
    );

    const signInUser = await signInResponse.json();
    console.log('signInUser', signInUser);
    
    if(signInUser.success) {
      dispatch(setLogin({
        user: signInUser,
      }));
    }
  };

  const signUp = async (name, email, phoneNumber, password, companyAddress, companyName) => {
    //
    const role = 'ROLE_USER';
    const registerUserResponse = await fetch(
      "https://eorder-was.herokuapp.com/sign-api/sign-up",
      {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phoneNumber,
            password,
            companyAddress,
            companyName,
            role
          }),
      }
    );
    console.log('registerUserResponse', registerUserResponse);
    //const registeredUser = await registerUserResponse.json();
    return registerUserResponse;
  };

  const signOut = () => {
    dispatch(setLogout());
  };

  return (
    <AuthContext.Provider
      value={{
        skip,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
