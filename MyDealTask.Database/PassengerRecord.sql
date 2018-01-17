CREATE TABLE [dbo].[PassengerRecord] (
    [Id]              INT           IDENTITY (1, 1) NOT NULL,
    [FirstName]       VARCHAR (30)  NOT NULL,
    [LastName]        VARCHAR (30)  NOT NULL,
    [RecordLocatorId] INT           NOT NULL,
    [LineData]        NVARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK__Passenger__Recor__20C1E124] FOREIGN KEY ([RecordLocatorId]) REFERENCES [dbo].[RecordLocator] ([Id]) ON DELETE CASCADE
);


