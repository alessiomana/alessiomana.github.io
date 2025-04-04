The Multi-Version Cluster (MVC) mechanism synchronizes connections between Cluster Members that run different versions. 

You can upgrade to a newer version without a loss in connectivity (Zero Downtime Upgrade) and test the new version on some of the Cluster Members before you decide to upgrade the rest of the Cluster Members.

## Multi-Version Cluster Upgrade Prerequisites

![[Screenshot 2025-04-04 alle 15.18.50.png]]

---
## Multi-Version Cluster Upgrade Procedure - VSX Mode
### Disable CoreXL Dynamic Balancing
As a workaround, follow this upgrade action plan to make sure CoreXL Dynamic Balancing stays disabled by default, and manual affinity settings are not overridden (if they exist): 
1. Upgrade the VSX Cluster Members to R81.20 and reboot. 
2. Connect to the command line on each VSX Cluster Member. 
3. Log in to the Expert mode. 
4. Back up the `$FWDIR/conf/dynamic_split.conf` file: 
```
cp -v $FWDIR/conf/dynamic_split.conf{,_BKP} 
```
4. Edit the `$FWDIR/conf/dynamic_split.conf` file: 
```
vi $FWDIR/conf/dynamic_split.conf 
```
5. In this parameter, configure the value "1" (one): 
```
OFF_BY_DEFAULT_ON_VSX=1 
```
5. Save the changes in the file and exit the editor. 
6. Install the R81.20 Jumbo Hotfix Accumulator on each Traditional VSX Cluster Member and reboot. 
   **Important** - ==Perform the installation of a Jumbo Hotfix Accumulator as an upgrade in a Traditional VSX Cluster.==
### Perform upgrade (Action Plan)
1. [[#On the Management Server, upgrade the VSX Cluster object to R81.20]]
2. On the VSX Cluster Member M2: 
	1. [[#Upgrade to R81.20]]
	2. Reboot
	3. [[#On each VSX Cluster Member, examine the VSX configuration and cluster state]]
	4. [[#Enable the MVC]]
3. In SmartConsole, install the Access Control Policy on the R81.20 VSX Cluster Member M2 
4. On the remaining VSX Cluster Member M1: 
	1. [[#Upgrade to R81.20]]
	2. Reboot
5. In SmartConsole, install the Access Control Policy and the Threat Prevention Policy on the VSX Cluster object. 
6. [[#In SmartConsole, install the Access Control Policy and the Threat Prevention Policy on the VSX Cluster object]]
7. [[#On each VSX Cluster Member, disable the MVC mechanism]]
8. [[#In SmartConsole, install the Access Control Policy and the Threat Prevention Policy on each Virtual System object]]

### Perform upgrade (Procedure)
##### On the Management Server, upgrade the VSX Cluster object to R81.20
| Step | Instructions                                                                                                                                                                                                                                                                                    |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Connect to the command line on the Security Management Server or Multi-Domain Server that manages this VSX Cluster.                                                                                                                                                                             |
| 2    | Log in to the Expert mode.                                                                                                                                                                                                                                                                      |
| 3    | On a Multi-Domain Server, go to the context of the Main Domain Management Server that manages this VSX Cluster object:<br>`mdsenv <IP Address or Name of Main Domain Management Server>`                                                                                                        |
| 4    | Upgrade the configuration of the VSX Cluster object to R81.20:<br>`vsx_util upgrade`<br>This command is interactive.                                                                                                                                                                            |
|      | Enter these details to log in to the management database:<br> - IP address of the Security Management Server or Main Domain Management Server that manages this VSX Cluster<br> - Management Server administrator's username<br> - Management Server administrator's password                   |
|      | Select your VSX Cluster.                                                                                                                                                                                                                                                                        |
|      | Select R81.20.                                                                                                                                                                                                                                                                                  |
|      | For auditing purposes, save the vsx_util log file:<br> - On a Security Management Server:<br>`/opt/CPsuite-R81.20/fw1/log/vsx_util_YYYYMMDD_HH_MM.log`<br><br> - On a Multi-Domain Server:<br>`/opt/CPmds-R81.20/customers/<Name_of_Domain>/CPsuite-R81.20/fw1/log/vsx_util_YYYYMMDD_HH_MM.log` |
| 5    | Connect with SmartConsole to the R81.20 Security Management Server or Main Domain Management Server that manages this VSX Cluster.                                                                                                                                                              |
| 6    | From the left navigation panel, click Gateways & Servers.                                                                                                                                                                                                                                       |
| 7    | Open the VSX Cluster object.                                                                                                                                                                                                                                                                    |
| 8    | From the left tree, click the General Properties page.                                                                                                                                                                                                                                          |
| 9    | Make sure in the Platform section, the Version field shows R81.20.                                                                                                                                                                                                                              |
| 10   | Click **Cancel** (do not click OK).                                                                                                                                                                                                                                                             |
##### Upgrade to R81.20
Follow the steps in CPUSE.
##### On each VSX Cluster Member, examine the VSX configuration and cluster state
| Step | Instructions                                                                                                                                                                                                          |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Connect to the command line on eachVSX Cluster Member.                                                                                                                                                                |
| 2    | Log in to the Expert mode.                                                                                                                                                                                            |
| 3    | Examine the VSX configuration:<br>`vsx stat -v`<br><br>Important:<br> - Make sure all the configured Virtual Devices are loaded.<br> - Make sure all Virtual Systems and Virtual Routers have SIC Trust and policy.   |
| 4    | Examine the cluster state in one of these ways:<br>- In Gaia Clish, run:<br>`set virtual-system 0`<br>`show cluster state`<br><br> - In the Expert mode, run:<br>`vsenv 0`<br>`cphaprob state`                        |
| 5    | Examine the cluster interfaces in one of these ways:<br> - In Gaia Clish, run:<br>`set virtual-system 0`<br>`show cluster members interfaces all`<br><br> - In the Expert mode, run:<br>`vsenv 0`<br>`cphaprob -a if` |
**Important:**
 - The upgraded VSX Cluster Member M3 shows its cluster state as Ready.
 - Other VSX Cluster Members M2 and M1 show the cluster state of the upgraded VSX Cluster Member M3 as Lost, or do not detect it.
 - All Virtual Systems must show the same information about the states of all Virtual Systems.
##### Enable the MVC
| Step | Instructions                                                                                                                               |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Connect to the command line on the VSX Cluster Member.                                                                                     |
| 2    | Go to the context of Virtual System 0:<br> - In Gaia Clish:<br>`set virtual-system 0`<br><br> - In the Expert mode:<br>`vsenv 0`           |
| 3    | Enable the MVC Mechanism:<br> - In Gaia Clish:<br>`set cluster member mvc on`<br><br> - In the Expert mode:<br>`cphaconf mvc on`           |
| 4    | Examine the state of the MVC Mechanism:<br> - In Gaia Clish:<br>`show cluster members mvc`<br><br> - In the Expert mode:<br>`cphaprob mvc` |
##### In SmartConsole, install the Access Control Policy and the Threat Prevention Policy on the VSX Cluster object

##### On each VSX Cluster Member, disable the MVC mechanism

##### In SmartConsole, install the Access Control Policy and the Threat Prevention Policy on each Virtual System object

##### Test the functionality
