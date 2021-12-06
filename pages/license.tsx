import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../components/common/Link';

export default function About(): JSX.Element {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Agora App Builder Terms of Service Definition
        </Typography>
        <p>
          “Agora App Builder” means the collection of software tools,
          components, and services provided by Agora to facilitate the creation
          of Customer Applications, consisting of an online service and
          interface (the “AAB Console”), a downloadable command line interface
          tool (the “AB CLI”), the core application code (“AB Core”), and
          certain server-side implementation code libraries designed to
          facilitate the implementation of Customer Applications created using
          the Agora App Builder (“AB Backend”).
        </p>
        <p>
          Other terms not defined herein shall have the same meaning ascribed to
          it in Agora Terms of Service.
        </p>
        License
        <p>
          To assist Customer with the development and deployment of Customer
          Applications, subject to the terms and conditions of Agora Terms of
          Service and this Terms of Service and during the subscription term,
          Agora grants Customer a limited, non-exclusive, no-charge,
          royalty-free, non-exclusive, non-transferable, world-wide (subject to
          all applicable export control laws), revocable, and non-sublicensable
          right and license to use, modify, reproduce, prepare derivative works
          of, and distribute Agora APP Builder.
        </p>
        Limitations
        <p>
          Subject to the terms of Agora Terms of Service, you may access and use
          the Agora App Builder tools and software for the purpose of building
          Customer Applications for use with the Agora Services. If you choose
          to access and use the Agora App Builder, the following additional
          terms and conditions apply:
        </p>
        <p>
          With respect to the Console, you may not upload any harmful content,
          or any content for which the Console was not designed, or otherwise
          access or use the Console with any automated service, crawler, bot, or
          similar device, and you acknowledge and agree that Agora makes not
          representation or warranty with respect to uptime, availability, or
          data storage, retention, or integrity.
        </p>
        <p>
          Your use of the Agora App Builder tools and software is expressly
          limited to use in connection with the development of Customer
          Applications designed and deployed for use with the Agora Service in
          accordance with this Agreement, and for no other purpose, and you are
          expressly prohibited from using or modifying any Agora App Builder
          tools or software (or any portion or modification thereof) for any
          purpose that is competitive to, or implements or integrates with any
          service that is competitive to, the Agora Services.
        </p>
        <p>
          Where components of the Agora App Builder are provided in source code
          form, and expressly identified as editable in the applicable
          documentation (the “Source Available Modules”), you may modify the
          source code to such Source Available Modules, solely in connection
          with the development of your Customer Applications that work with the
          Agora Service, and you are expressly prohibited from modifying the
          Source Available Modules for any other purpose, or modifying any other
          component of the Agora App Builder.
        </p>
        <p>
          Where components of the Agora App Builder expressly identified as
          redistributable in the applicable documentation (the “Redistributable
          Modules”), you may redistribute such Redistributable Modules solely as
          a part of an otherwise authorized and compliant distribution of your
          Customer Applications in accordance with this Agreement, and you are
          expressly prohibited from distributing the Redistributable Modules for
          any other purpose, or redistributing any other component of the Agora
          App Builder.
        </p>
        <p>
          You may not use Agora App Builder or any part thereof on a service
          bureau basis, or on behalf of any third party, including for the
          purpose of creating applications for any third party (whether on a
          white label basis, or otherwise), or for offering or enabling the
          development of apps designed to interoperate with third party
          communication or distribution services other than the Agora Services.
        </p>
        <p>
          You must otherwise comply with all other terms and conditions of Agora
          Terms of Service, including with respect to the development,
          distribution, maintenance, support, licensing, and sale of Customer
          Applications.
        </p>
        <Link href="/">Go to the main page</Link>
      </Box>
    </Container>
  );
}
