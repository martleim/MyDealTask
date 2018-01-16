CREATE TABLE [dbo].[PassengerRecord]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [FirstName] VARCHAR(30) NOT NULL, 
    [LastName] VARCHAR(30) NOT NULL, 
    [RecordLocatorId] int NOT NULL FOREIGN KEY REFERENCES [RecordLocator](Id), 
    [LineData] NVARCHAR(22) NULL
)
