import React, { useCallback } from "react";
import { Box, Button, Grid, Hidden, TextField, Typography } from "@material-ui/core";
import StakaterLogo from "../../assets/img/stakater-icon.svg";
import { GitHub, LinkedIn } from "@material-ui/icons";
import CloudIcon from "../../assets/img/cloud-icon.svg";
import { FieldWrapper } from "../shared/components/forms/field-wrapper";
import styled from "styled-components";
import { doubleStorage } from "../shared/decorators/utils";
import { authService } from "./keycloak.service";
import { STORED_REALM } from "./auth.redux";
import { httpClient } from "../../services/client";
import { API } from "../../services/api";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { FormContainer } from "../shared/components/forms/form-container";

const Welcome = () => {
  const setRealm = ({ realm }: any) => {
    authService.checkSSSO(realm).then(() => {
      doubleStorage.set(STORED_REALM, realm);
      location.reload();
    });
  };

  const validateRealm = useCallback((realmName: string) => {
    if (!realmName || realmName.length < 3) {
      return "Domain is at least 3 characters long";
    }

    const errorMsg = "Enterprise Domain does not exist";
    return httpClient
      .get(API.validateRealm, { params: { realmName }, disableAuth: true })
      .pipe(
        map((status) => (status ? undefined : errorMsg)),
        catchError(() => of(errorMsg)),
      )
      .toPromise();
  }, []);

  return (
    <Grid container className="h100">
      <Hidden mdDown>
        <Left container item md={12} lg={6}>
          <Background />
          <div className="container">
            <Box display="flex" alignItems="center" height="30%" fontFamily="Raleway" color="white">
              <StakaterLogo height={62} />
              <Typography variant="h2">Stakater</Typography>
            </Box>
            <div className="content">
              <p className="welcome">Welcome to</p>
              <h1 className="heading">
                Stakater <b>Cloud</b>
              </h1>

              <p className="description">The perfect PaaS offering for Stakater Red Hat Openshift.</p>
              <small>Learn more</small>
              <div className="links">
                <a
                  className="color-inherit"
                  href="https://stakater.com/offerings/stakater-redhat-openshift"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pricing
                </a>
                {/* <a>Catalog</a> */}
                <a
                  className="color-inherit"
                  href="https://stakaterclouddocs.stakater.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Doc
                </a>
                {/* <a>Status</a> */}
              </div>
            </div>

            <div className="footer mt-auto">
              <small>Follow us on</small>
              <br />
              <a href="https://github.com/stakater" target="_blank" rel="noopener noreferrer">
                <GitHub />
              </a>
              <a href="http://linkedin.com/company/stakater" target="_blank" rel="noopener noreferrer">
                <LinkedIn />
              </a>
            </div>
          </div>
        </Left>
      </Hidden>

      <Right container item md={12} lg={6} justify={"space-around"}>
        <Hidden lgUp>
          <Background />
        </Hidden>

        <FormContainer onSubmit={setRealm}>
          <div className="loginContainer">
            <div className="heading">
              <div>
                <CloudIcon className="mr1" />
                Stakater <b>Cloud</b>
              </div>

              <div>Enterprise SSO Login</div>
            </div>

            <label>Enterprise Domain</label>

            <FieldWrapper name="realm" validate={validateRealm}>
              <TextField variant={"outlined"} type="text" />
            </FieldWrapper>

            <p>The Enterprise Domain is provided by Stakater Cloud administrator</p>
            <Button type="submit" variant={"contained"}>
              Login
            </Button>

            <small>
              To try Stakater Cloud send a request at: <a href="mailto:sales@stakater.com">sales@stakater.com</a>
            </small>
          </div>
        </FormContainer>
      </Right>
    </Grid>
  );
};

const Background = styled.div`
  position: absolute;
  background: transparent linear-gradient(139deg, #f89a02 0%, #fd7401 15%, #3e0054 100%) 0 0 no-repeat padding-box;
  width: 100%;
  height: 100%;
  z-index: 0;

  &:after {
    display: block;
    content: "";
    width: 100%;
    height: 100%;

    top: 0;
    left: 0;

    background: transparent url(${require("../../assets/img/city.png")}) 0 0 no-repeat padding-box;
    opacity: 0.12;
    background-size: cover;
  }
`;

const Left = styled(Grid)`
  position: relative;
  width: 100%;
  height: 100%;

  .container {
    display: flex;
    flex-direction: column;
    padding: 5rem 2rem 1rem 5rem;
    z-index: 1;
  }

  .logo {
    display: inline-block;
    height: 30%;
    svg {
      height: 62px;
    }
  }

  .content {
    right: 50px;
    bottom: 0;
    color: white;
    letter-spacing: 0;

    .welcome {
      font: normal 24px/29px Montserrat;
      margin: 0;
    }

    .heading {
      font: normal normal normal 64px/78px Montserrat;
      margin: 0;

      b {
        font: normal normal 600 64px/78px Montserrat;
      }
    }

    .description {
      font: normal normal normal 28px/34px Montserrat;
    }

    small {
      font: normal 12px/15px Montserrat;
      margin: 0;
    }

    a {
      text-decoration: underline;
      font: normal 12px/15px Montserrat;
      margin-right: 3rem;
      color: white;
    }
  }

  .footer {
    margin-top: auto;
    color: white;
    font: normal 12px/15px Montserrat;

    a {
      color: white;
    }

    svg {
      font-size: 17px;
      margin-right: 0.5rem;
    }
  }
`;

const Right = styled(Grid)`
  position: relative;
  align-items: center;
  justify-content: center;
  background: #f1f1f1 0 0 no-repeat padding-box;
  font-weight: lighter;

  form {
    z-index: 1;
  }

  .loginContainer {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 2rem;
    margin: auto 2rem;

    .heading {
      display: flex;
      justify-content: space-between;
      font: normal normal normal 24px/29px Montserrat;
      margin-bottom: 2rem;

      b {
        font: normal normal 600 22px/27px Montserrat;
      }
    }

    label {
      font: normal normal bold 16px/19px Montserrat;
      text-transform: none;
    }

    p {
      text-align: center;
      font: normal normal normal 24px/29px Montserrat;
    }

    a {
      color: #24bbf8;
      margin-top: 1rem;
    }

    small {
      font: normal normal normal 16px/19px Montserrat;
      text-align: center;
    }

    button {
      width: 157px;
      height: 48px;
      margin-bottom: 1.5rem;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

export default Welcome;
