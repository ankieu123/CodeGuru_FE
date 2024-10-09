import React from 'react';

interface IHeadProps {
    title: string,
    description: string,
    keywords: string
}

const Heading = (props: IHeadProps) => {
    const { title, description, keywords } = props;
    return (
        <>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="viewport" content={description} />
            <meta name="viewport" content={keywords} />
        </>
    );
};

export default Heading;
