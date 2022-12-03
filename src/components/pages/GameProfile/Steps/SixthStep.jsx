import { Button, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as DiscordLogo } from "../../../../assets/discord-logo.svg";
import { updateUser } from "../../../../redux/slices/authSlice";
import Breach from "../../../../assets/valorant/breach.png";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

const DISCORD_CDN = "https://cdn.discordapp.com";

function SixthStep({ game, nextStep }) {
  const searchParams = useSearchParams();
  const redirectURL = `${process.env.REACT_APP_CLIENT_URL}/creation/${game}/${
    nextStep - 1
  }`;
  const discordAuthLink = `https://discord.com/api/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=${redirectURL}&response_type=code&scope=identify`;
  const discordCode = searchParams[0].get("code");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, username, avatar } = useSelector(
    (state) => state.auth.user.discord
  );

  useEffect(() => {
    if (discordCode) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/discord?redirect_url=${redirectURL}&code=${discordCode}`,
          { withCredentials: true }
        )
        .then((data) => {
          const { message, user } = data.data;
          if (user) {
            dispatch(updateUser({ updated: user }));
          }
        })
        .catch((err) => {
          //display error
          console.log(err.message);
        });
    }
  }, [discordCode, dispatch, redirectURL]);

  // https://cdn.discordapp.com/avatars/user_id/user_avatar.png

  return (
    <section className="discord-oath">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${Breach})` }}
      />

      <div className="discord-link-info">
        <Typography className="title" variant="h6">
          <ContactSupportIcon />
          Linking your <DiscordLogo className="discord-icon" /> account
        </Typography>
        <Typography variant="body2" color="lightgray" gutterBottom>
          Worry not! With you linking your discord account our app hold only
          data such as <b>id,username & avatar</b>.
          <br />
          <i>This step is completely optional.</i>
        </Typography>
        <Typography variant="body2" color="lightgray" gutterBottom>
          <b>Linking</b> account exchanges your public discord profile data with
          our application so we can use them for quicker communication.
        </Typography>

        <Typography variant="body2" color="lightgray" gutterBottom>
          <b>Unlinking</b> account removes all data related to your discord
          link.
        </Typography>

        <Typography variant="caption" color="lightgray" gutterBottom>
          Data are used for public profiles so that people looking for teammates
          can grab your username#tag fast with one click of a button.
        </Typography>
      </div>
      <div className="discord-link">
        {id.length > 0 ? (
          <>
            <Typography className="discord-user" gutterBottom>
              <img
                src={`${DISCORD_CDN}/avatars/${id}/${avatar}.webp?size=64`}
                alt="discord avatar"
              />
              {username} connected
            </Typography>
            <Button
              variant="contained"
              color="error"
              endIcon={<DiscordLogo className="discord-icon" />}
              onClick={() => {
                /**remove from redux store and sent request to db to remove values */
                axios
                  .patch(
                    `${process.env.REACT_APP_API_URL}/discord/unlink`,
                    {},
                    { withCredentials: true }
                  )
                  .then((data) => {
                    const { updated } = data.data;
                    if (updated) dispatch(updateUser({ updated }));
                  })
                  .catch((err) => console.log("error", err));
              }}
            >
              Unlink your account
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            endIcon={<DiscordLogo className="discord-icon" />}
            href={discordAuthLink}
          >
            Link your account
          </Button>
        )}
        <Button variant="outlined" color="error" onClick={() => navigate(`/creation/${game}/${nextStep}`)}>
          Continue
        </Button>
      </div>

      <Snackbar
        open={true}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={() => console.log("snackbar closing")}
        message="TODO: show responses from discord"
        key={"right"}
      />
    </section>
  );
}

export default SixthStep;
